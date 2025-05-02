import { Resend } from 'npm:resend@1.0.0';

const resend = new Resend('re_CvaVGM8b_DiSojtkYfss3k9Jk5WxGqReA');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, user-agent',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function getBrowserInfo(userAgent: string) {
  const ua = userAgent.toLowerCase();
  let browser = 'Unknown';
  let version = '';
  let os = 'Unknown';
  let device = 'Unknown';
  let isMobile = false;

  // Detect OS
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'MacOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) {
    os = 'Android';
    isMobile = true;
  }
  else if (ua.includes('iphone') || ua.includes('ipad')) {
    os = 'iOS';
    isMobile = true;
  }

  // Detect device type
  if (isMobile) {
    if (ua.includes('tablet') || ua.includes('ipad')) device = 'Tablet';
    else device = 'Mobile';
  } else {
    device = 'Desktop';
  }

  // Detect browser
  if (ua.includes('firefox')) {
    browser = 'Firefox';
    version = ua.match(/firefox\/([\d.]+)/)?.[1] || '';
  } else if (ua.includes('edg')) {
    browser = 'Edge';
    version = ua.match(/edg\/([\d.]+)/)?.[1] || '';
  } else if (ua.includes('chrome')) {
    browser = 'Chrome';
    version = ua.match(/chrome\/([\d.]+)/)?.[1] || '';
  } else if (ua.includes('safari')) {
    browser = 'Safari';
    version = ua.match(/version\/([\d.]+)/)?.[1] || '';
  }

  return { name: browser, version, os, device };
}

async function getDetailedLocationInfo(ip: string) {
  try {
    const [ipApiResponse, ipInfoResponse] = await Promise.all([
      fetch(`https://ipapi.co/${ip}/json/`),
      fetch(`https://ipinfo.io/${ip}/json?token=5d5e44f06c0721`)
    ]);

    const ipApiData = await ipApiResponse.json();
    const ipInfoData = await ipInfoResponse.json();

    return {
      city: ipApiData.city || ipInfoData.city || 'Unknown',
      region: ipApiData.region || ipInfoData.region || 'Unknown',
      country: ipApiData.country_name || ipInfoData.country || 'Unknown',
      postal: ipApiData.postal || ipInfoData.postal || 'Unknown',
      latitude: ipApiData.latitude || (ipInfoData.loc ? ipInfoData.loc.split(',')[0] : 'Unknown'),
      longitude: ipApiData.longitude || (ipInfoData.loc ? ipInfoData.loc.split(',')[1] : 'Unknown'),
      timezone: ipApiData.timezone || ipInfoData.timezone || 'Unknown',
      isp: ipApiData.org || ipInfoData.org || 'Unknown',
      asn: ipApiData.asn || 'Unknown',
      currency: ipApiData.currency || 'Unknown',
      country_code: ipApiData.country_code || ipInfoData.country || 'Unknown',
      languages: ipApiData.languages || 'Unknown',
      security: {
        is_proxy: ipApiData.proxy || false,
        is_hosting: ipApiData.hosting || false,
        is_mobile: ipApiData.mobile || false,
      }
    };
  } catch (error) {
    console.error('Error fetching detailed location info:', error);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error(`Method ${req.method} not allowed`);
    }

    // Get IP address from request headers
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                    req.headers.get('x-real-ip') || 
                    'Unknown IP';

    // Skip email sending for specific IP
    if (clientIP === '213.149.62.91') {
      return new Response(
        JSON.stringify({ success: true, message: 'Visitor tracked without notification' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get user agent information
    const userAgent = req.headers.get('user-agent') || 'Unknown Browser';
    const browserInfo = getBrowserInfo(userAgent);
    
    // Get detailed location information
    const locationInfo = await getDetailedLocationInfo(clientIP);

    // Get timestamp in multiple formats
    const now = new Date();
    const timestamp = {
      utc: now.toUTCString(),
      local: now.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
      unix: Math.floor(now.getTime() / 1000)
    };

    // Get additional request headers
    const acceptLanguage = req.headers.get('accept-language') || 'Unknown';
    const referer = req.headers.get('referer') || 'Direct Access';
    
    console.log('Sending visitor notification email...');
    const { data, error: resendError } = await resend.emails.send({
      from: 'Portfolio Visitor <onboarding@resend.dev>',
      to: 'aalexandre.lefebvre@gmail.com',
      subject: '🔔 Nouveau visiteur sur votre portfolio',
      html: `
        <h2>Nouveau visiteur détecté</h2>
        
        <h3>Informations temporelles</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Date (UTC):</strong> ${timestamp.utc}</li>
          <li><strong>Date (Paris):</strong> ${timestamp.local}</li>
          <li><strong>Timestamp Unix:</strong> ${timestamp.unix}</li>
        </ul>

        <h3>Informations techniques</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Adresse IP:</strong> ${clientIP}</li>
          <li><strong>Langue préférée:</strong> ${acceptLanguage}</li>
          <li><strong>Page source:</strong> ${referer}</li>
        </ul>

        <h3>Informations du navigateur</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Navigateur:</strong> ${browserInfo.name} ${browserInfo.version}</li>
          <li><strong>Système d'exploitation:</strong> ${browserInfo.os}</li>
          <li><strong>Type d'appareil:</strong> ${browserInfo.device}</li>
          <li><strong>User Agent complet:</strong> ${userAgent}</li>
        </ul>

        ${locationInfo ? `
          <h3>Informations de localisation</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Ville:</strong> ${locationInfo.city}</li>
            <li><strong>Région:</strong> ${locationInfo.region}</li>
            <li><strong>Pays:</strong> ${locationInfo.country} (${locationInfo.country_code})</li>
            <li><strong>Code postal:</strong> ${locationInfo.postal}</li>
            <li><strong>Coordonnées:</strong> ${locationInfo.latitude}, ${locationInfo.longitude}</li>
            <li><strong>Fuseau horaire:</strong> ${locationInfo.timezone}</li>
            <li><strong>FAI:</strong> ${locationInfo.isp}</li>
            <li><strong>ASN:</strong> ${locationInfo.asn}</li>
            <li><strong>Devise locale:</strong> ${locationInfo.currency}</li>
            <li><strong>Langues:</strong> ${locationInfo.languages}</li>
            <li><strong>Sécurité:</strong>
              <ul style="list-style: none; padding-left: 20px;">
                <li>- Proxy: ${locationInfo.security.is_proxy ? 'Oui' : 'Non'}</li>
                <li>- Hébergeur: ${locationInfo.security.is_hosting ? 'Oui' : 'Non'}</li>
                <li>- Connexion mobile: ${locationInfo.security.is_mobile ? 'Oui' : 'Non'}</li>
              </ul>
            </li>
          </ul>
        ` : ''}
      `,
    });

    if (resendError) {
      console.error('Resend API error:', resendError);
      throw new Error('Failed to send email: ' + resendError.message);
    }

    console.log('Visitor notification email sent successfully:', data);
    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in track-visitor function:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: error instanceof Error && error.message.includes('Invalid') ? 400 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});