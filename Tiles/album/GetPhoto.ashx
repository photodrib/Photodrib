<%@ WebHandler Language="C#" Class="GetPhoto" %>

using Buddy;
using Buddy.BuddyService;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class GetPhoto : IHttpHandler, IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        context.Response.ContentType = "text/plain";
        int pid;
        try
        {
            pid = int.Parse(context.Request["pid"]);
        }
        catch (Exception)
        {
            context.Response.Write("null");
            return;
        }
        int uid;
        try
        {
            uid = int.Parse(context.Request["uid"]);
        }
        catch (Exception)
        {
            context.Response.Write("null");
            return;
        }
        AuthenticatedUser buddyUser = context.Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            context.Response.Write("null");
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_Photo_GetCompleted += (object sdr, Pictures_Photo_GetCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                context.Response.Write("null");
                return;
            }
            var pic = evt.Result;
            context.Response.Write(Json.Encode(pic[0]));
        };
        client.Pictures_Photo_GetAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, uid.ToString(), pid.ToString());
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}