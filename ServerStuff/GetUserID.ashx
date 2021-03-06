﻿<%@ WebHandler Language="C#" Class="GetUserID" %>

using Buddy;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.Security;
using System.Web.SessionState;

public class GetUserID : IHttpHandler, IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        // Return the user ID of the currently logged in user if no arguments are provided
        // Or return the user ID of the given username
        context.Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        context.Response.ContentType = "text/plain";
        AuthenticatedUser buddyUser = context.Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            context.Response.Write("null");
            return;
        }
        string userName = context.Request["name"] ?? "";
        if (userName == "")
        {
            context.Response.Write(Json.Encode(buddyUser.ID));
        }
        else
        {
            MembershipUser user = Membership.GetUser(userName);
            if (user == null)
            {
                context.Response.Write("null");
            }
            else
            {
                UserProfile profile = (UserProfile)UserProfile.Create(user.UserName);
                context.Response.Write(Json.Encode(profile.BuddyUserID));
            }
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}