using Buddy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Tiles_album_CreateAlbum : System.Web.UI.Page
{
    AuthenticatedUser buddyUser;

    protected void Page_Load(object sender, EventArgs e)
    {
        buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            AlbumForm.Visible = false;
            MessagePanel.Visible = true;
            Message.Text = "Please login first";
        }

    }
    protected void CreateAlbumButton_Click(object sender, EventArgs e)
    {
        string albumName = Request["name"] ?? "";
        if (albumName == "")
        {
            MessagePanel.Visible = true;
            Message.Text = "Please input the album name";
            return;
        }
        bool isPublic = Request["private"] == null ? true : false;
        var task = buddyUser.PhotoAlbums.Create(albumName, isPublic);
        try
        {
            task.Wait();
        }
        catch (Exception)
        {
            MessagePanel.Visible = true;
            Message.Text = "Cannot connect to the server";
            return;
        }
        MessagePanel.Visible = true;
        Message.Text = System.Web.Helpers.Json.Encode(task.Result);
        return;
    }
}