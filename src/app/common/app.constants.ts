export class AppConstants {
    private static API_BASE_URL = "http://localhost:8083/";
    private static OAUTH2_URL = AppConstants.API_BASE_URL + "oauth2/authorization/";
    private static REDIRECT_URL = "?redirect_uri=http://localhost:4200/login";
    public static API_URL = AppConstants.API_BASE_URL + "api/";
    public static LIST_REFERENCE_TRANSACTION = AppConstants.API_BASE_URL + "api/user/listUserReferenceTransaction";
    public static ADD_BUDDY = AppConstants.API_BASE_URL + "api/user/addBuddy";
    public static DELETE_BUDDY = AppConstants.API_BASE_URL + "api/user/deleteBuddy";
    public static ADD_CASH = AppConstants.API_BASE_URL + "api/user/addCash";
    public static GET_LIST_HISTORY = AppConstants.API_BASE_URL + "api/user/history";
    public static GET_ACCOUNT_SITUATION = AppConstants.API_BASE_URL + "api/user/accountSituation";
    public static GET_LIST_BUDDY = AppConstants.API_BASE_URL + "api/user/getListBuddy";
    public static GET_USER_INFORMATIONS = AppConstants.API_BASE_URL + "api/user/getUserInformations";
    public static START_TRANSACTION = AppConstants.API_BASE_URL + "api/user/startTransaction";
    public static LIST_USER = AppConstants.API_BASE_URL + "api/listUser";
    public static USER_BY_EMAIL = AppConstants.API_BASE_URL + "api/auth/listUser/email";
    public static AUTH_API = AppConstants.API_URL + "auth/";
    public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;
    public static FACEBOOK_AUTH_URL = AppConstants.OAUTH2_URL + "facebook" + AppConstants.REDIRECT_URL;
    public static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + "github" + AppConstants.REDIRECT_URL;
    public static LINKEDIN_AUTH_URL = AppConstants.OAUTH2_URL + "linkedin" + AppConstants.REDIRECT_URL;
}