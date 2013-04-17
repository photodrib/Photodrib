// Copyright 2012 Omar AL Zabir
using System.Web.Profile;
using System.Web.Security;


/// <summary>
/// Summary description for UserProfile
/// </summary>
public class UserProfile : ProfileBase
{
    static public UserProfile CurrentUser
    {
        get
        {
            return (UserProfile)
                    (ProfileBase.Create(Membership.GetUser().UserName));
        }
    }

    public string FirstName
    {
        get { return ((string)(base["FirstName"])); }
        set { base["FirstName"] = value; Save(); }
    }

    public string LastName    
    {
        get { return ((string)(base["LastName"])); }
        set { base["LastName"] = value; Save(); }
    }

    public string Email
    {
        get { return ((string)(base["Email"])); }
        set { base["Email"] = value; Save(); }
    }

    public string BuddyToken
    {
        get { return ((string)(base["BuddyToken"])); }
        set { base["BuddyToken"] = value; Save(); }
    }

    public int BuddyUserID
    {
        get { return ((int)(base["BuddyUserID"])); }
        set { base["BuddyUserID"] = value; Save(); }
    }

    public string Tiles
    {
        get { return ((string)(base["Tiles"])); }
        set { base["Tiles"] = value; Save(); }
    }
     
}
