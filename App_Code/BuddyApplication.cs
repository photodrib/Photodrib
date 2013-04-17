using Buddy;

/// <summary>
/// Photodrib Buddy application information and utilities
/// </summary>
public class BuddyApplication
{
    public const string APPNAME = "Photodrib";
    public const string APPPASS = "16632580-C9B0-478A-BDA9-B17391A4F4DE";
    public const int SUPERID = 3008216;
    public const string SUPERTOKEN = "UT-ccad4114-7013-4437-91d1-98d005d8a5d8";
    public const int RUID = 58365;

    public static BuddyClient Create()
    {
        return new BuddyClient(APPNAME, APPPASS);
    }
}