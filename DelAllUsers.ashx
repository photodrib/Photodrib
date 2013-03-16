<%@ WebHandler Language="C#" Class="DelAllUsers" %>

using System;
using System.Threading;
using System.Web;
using System.Web.Security;
using Buddy.BuddyService;

public class DelAllUsers : IHttpHandler {

    private const string ADMINTOKEN = "UT-ccad4114-7013-4437-91d1-98d005d8a5d8";
    private string buddyUserID;
    private ManualResetEvent buddyEvent;
    
    public void ProcessRequest (HttpContext context) {
        BuddyServiceClient client = new BuddyServiceClient(BuddyServiceClient.EndpointConfiguration.soap);
        client.UserAccount_Profile_GetUserIDFromUserTokenCompleted += new EventHandler<UserAccount_Profile_GetUserIDFromUserTokenCompletedEventArgs>(BuddyGetUserIDCallback);
        client.UserAccount_Profile_DeleteAccountCompleted += new EventHandler<UserAccount_Profile_DeleteAccountCompletedEventArgs>(BuddyDeleteUserCallback);
        MembershipUserCollection users = Membership.GetAllUsers();
        context.Response.Write("Totally " + users.Count + " user(s).<br /><br />");
        foreach (MembershipUser user in users)
        {
            UserProfile profile = (UserProfile)UserProfile.Create(user.UserName);
            buddyEvent = new ManualResetEvent(false);
            client.UserAccount_Profile_GetUserIDFromUserTokenAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, profile.BuddyToken, null);
            buddyEvent.WaitOne();
            client.UserAccount_Profile_DeleteAccountAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUserID, null);
            Membership.DeleteUser(user.UserName);
            context.Response.Write("User: " + user.UserName + ", Buddy User Token: " + profile.BuddyToken + ", Buddy User ID: " + buddyUserID + ", deleted<br />");
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

    private void BuddyGetUserIDCallback(object sender, UserAccount_Profile_GetUserIDFromUserTokenCompletedEventArgs e)
    {
        buddyUserID = e.Result;
        ManualResetEvent waitEvent = Interlocked.CompareExchange(ref buddyEvent, null, null);
        waitEvent.Set();
    }

    private void BuddyDeleteUserCallback(object sender, UserAccount_Profile_DeleteAccountCompletedEventArgs e)
    {
    }
}
