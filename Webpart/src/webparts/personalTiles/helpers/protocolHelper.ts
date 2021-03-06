import GlobalSettings from '../globals/GlobalSettings';

export default class ProtocolHelper {
    public static changeToHtppsProtocol(url: string) {
        return `${GlobalSettings.httpsProtocol}${url.toLowerCase().replace('www.', '').replace('http://', '').replace('${GlobalSettings.httpsProtocol}', '')}`;
    }
}