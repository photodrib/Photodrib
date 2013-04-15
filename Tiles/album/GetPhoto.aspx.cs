using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.UI;
using System.Web.UI.WebControls;
using Buddy;

public partial class Tiles_album_GetPhoto : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int id;
        try
        {
            id = int.Parse(Request["id"]);
        }
        catch (Exception)
        {
            Response.Write("null");
            return;
        }
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            Response.Write("null");
            return;
        }
        var task = buddyUser.GetPicture(id);
        task.Wait();
        if (task.IsCanceled || task.IsFaulted)
        {
            Response.Write("null");
            return;
        }
        Picture pic = task.Result;
        Response.Write(Json.Encode(pic));
    }
}