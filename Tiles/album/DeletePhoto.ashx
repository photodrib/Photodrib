<%@ WebHandler Language="C#" Class="DeletePhoto" %>

using Buddy;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class DeletePhoto : IHttpHandler, IRequiresSessionState {

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
        int pictureID;
        try
        {
            pictureID = int.Parse(context.Request["pid"]);
        }
        catch (Exception)
        {
            context.Response.Write("null");
            return;
        }

        var getPicture = buddyUser.GetPicture(pictureID);
        getPicture.Wait();
        if (getPicture.IsCanceled || getPicture.IsFaulted)
        {
            context.Response.Write("null");
            return;
        }
        Picture pic = getPicture.Result;

        var delete = pic.Delete();
        delete.Wait();
        if (delete.IsCanceled || delete.IsFaulted)
        {
            context.Response.Write("null");
            return;
        }
        context.Response.Write(Json.Encode(delete.Result));
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}