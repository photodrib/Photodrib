using Buddy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Tiles_album_CreateAlbum : System.Web.UI.Page
{
// the default loading page method
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Profile.IsAnonymous)
        {
            AlbumForm.Visible = false;
            MessagePanel.Visible = true;
            Message.Text = "Please login first";
            return;
        }
        else
        {
            // connect to the buddy server if logged in
            Response.Cookies.Add(new HttpCookie("p", Profile.Tiles)
            {
                Expires = DateTime.Now.AddDays(30)
            });
            if (Session["buddyUser"] == null)
            {
                BuddyClient client = BuddyApplication.Create();
                var task = client.Login(Profile.BuddyToken);
                task.Wait();
                if (task.IsCanceled || task.IsFaulted)
                {
                    AlbumForm.Visible = false;
                    MessagePanel.Visible = true;
                    Message.Text = "Cannot connect to the server, please login again";
                }
                Session["buddyUser"] = task.Result;
            }
        }
    }
    //handle the clicked on create album button
    protected void CreateAlbumButton_Click(object sender, EventArgs e)
    {
        //handle the creating album in buddy
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            AlbumForm.Visible = false;
            MessagePanel.Visible = true;
            MessageTitle.Attributes["class"] = "label label-important";
            MessageTitle.InnerText = "Error";
            Message.Text = "Please login first";
            return;
        }
        string albumName = Request["name"] ?? "";
        if (albumName == "")
        {
            MessagePanel.Visible = true;
            MessageTitle.Attributes["class"] = "label label-important";
            MessageTitle.InnerText = "Error";
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
            MessageTitle.Attributes["class"] = "label label-important";
            MessageTitle.InnerText = "Error";
            Message.Text = "Cannot connect to the server";
            return;
        }
        MessagePanel.Visible = true;
        MessageTitle.Attributes["class"] = "label label-success";
        MessageTitle.InnerText = "Success";
        Message.Text = "Album created";
    }
}