using Buddy;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Tiles_album_DeletePhoto : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        Response.ContentType = "text/plain";
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            Response.Write("null");
            return;
        }
        int pictureID;
        try
        {
            pictureID = int.Parse(Request["pid"]);
        }
        catch (Exception)
        {
            Response.Write("null");
            return;
        }

        var getPicture = buddyUser.GetPicture(pictureID);
        getPicture.Wait();
        if (getPicture.IsCanceled || getPicture.IsFaulted)
        {
            Response.Write("null");
            return;
        }
        Picture pic = getPicture.Result;

        var delete = pic.Delete();
        delete.Wait();
        if (delete.IsCanceled || delete.IsFaulted)
        {
            Response.Write("null");
            return;
        }
        Response.Write(Json.Encode(delete.Result));
    }
}
