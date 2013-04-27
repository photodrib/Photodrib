<%@ WebHandler Language="C#" Class="GetUserIDList" %>

using System;
using System.Web;
using System.Web.Helpers;
using System.Web.Security;

public class GetUserIDList : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        //Get all registered users, output as a JSON object of the user list
        context.Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        context.Response.ContentType = "text/plain";
        if (context.Profile.IsAnonymous)
        {
            context.Response.Write("null");
            return;
        }
        MembershipUserCollection users = Membership.GetAllUsers();
        int[] userIDs = new int[users.Count];
        UserProfile profile;
        int i = 0;
        foreach (MembershipUser user in users)
        {
            profile = (UserProfile)UserProfile.Create(user.UserName);
            userIDs[i++] = profile.BuddyUserID;
        }
        context.Response.Write(Json.Encode(userIDs));
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}