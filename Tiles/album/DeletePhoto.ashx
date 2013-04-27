<%@ WebHandler Language="C#" Class="DeletePhoto" %>

using Buddy;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class DeletePhoto : IHttpHandler, IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        //Delete the photo of the user currently logged in given the photo ID
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
            pictureID = int.Parse(context.Request["id"]);
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
        if (pic == null)
        {
            context.Response.Write("null");
            return;
        }

        var delete = pic.Delete();
        try
        {
            delete.Wait();
        }
        catch (Exception)
        {
            context.Response.Write("null");
            return;
        }
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