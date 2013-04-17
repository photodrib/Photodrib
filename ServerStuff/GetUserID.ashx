<%@ WebHandler Language="C#" Class="GetUserID" %>

using Buddy;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class GetUserID : IHttpHandler, IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        context.Response.ContentType = "text/plain";
        AuthenticatedUser buddyUser = context.Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            context.Response.Write("null");
            return;
        }
        context.Response.Write(Json.Encode(buddyUser.ID));
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}