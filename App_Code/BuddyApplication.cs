using Buddy;

/// <summary>
/// Photodrib Buddy application information and utilities
/// </summary>
public class BuddyApplication
{
    public const string APPNAME = "Photodrib";
    public const string APPPASS = "16632580-C9B0-478A-BDA9-B17391A4F4DE";

    public static BuddyClient Create()
    {
        return new BuddyClient(APPNAME, APPPASS);
    }
}