using System;
using Buddy;
using Buddy.BuddyService;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Security;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

public partial class Edit : System.Web.UI.Page
{
    AuthenticatedUser buddyUser;

    protected void Page_Load(object sender, EventArgs e)
    {
        buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {

        }
        int photo_id;
        if (!Profile.IsAnonymous)
            Response.Cookies.Add(new HttpCookie("p", Profile.Tiles)
            {
                Expires = DateTime.Now.AddDays(30)
            });
        try
        {
            photo_id = int.Parse(Request["photo_id"]);
        }
        catch (Exception)
        {
            picture.Src = "./img/AngryBirds.jpg";
            return;
        }
        var task =  buddyUser.GetPicture(photo_id);
        task.Wait();
        if (task.IsCanceled || task.IsFaulted)
        {
            picture.Src = "./img/AngryBirds.jpg";
        }
        else
        {
            picture.Src = task.Result.FullUrl;
        }
    }

    private bool IsCombinedJSOlder(string path)
    {
        var jsPath = Context.Server.MapPath(path);
        string[] files = Directory.GetFiles(jsPath);

        var combinedFileLastWrite = File.GetLastWriteTime(Server.MapPath("~/js/Combined.js"));

        return Array.Exists(files, file => (File.GetLastWriteTime(file) - combinedFileLastWrite).TotalSeconds > 1);
    }

    protected string GetAlerts()
    {
        if (!Request.IsLocal)
        {
            if (IsCombinedJSOlder("~/js/") || IsCombinedJSOlder("~/Tiles/"))
            {
                return "$('#CombinedScriptAlert').show();";
            }
            else
            {
                return string.Empty;
            }
        }
        else
        {
            return string.Empty;
        }

    }
    protected void EditButton_Click(object sender, EventArgs e) 
    {  
        HttpWebRequest req;
        int resize, contrast, brightness;
        try
        {
            resize = int.Parse(Request["resize"]);
        }
        catch
        {
            resize = -1;
        }
        try
        {
            contrast = int.Parse(Request["contrast"]);
        }
        catch
        {
            contrast = -1;
        }
        try
        {
            brightness = int.Parse(Request["brightness"]);
        }
        catch
        {
            brightness = -1;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_Filters_GetListCompleted += (object sdr, Pictures_Filters_GetListCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                return;
            }
            var rst = evt.Result;
            var a = rst[0];
            Console.WriteLine(a);
            



        };
        client.Pictures_Filters_GetListAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS);
    }
    protected Picture GetPhoto(int photo_id) 
    {
        var task = buddyUser.GetPicture(photo_id);
        task.Wait();
        if (task.IsCanceled || task.IsFaulted) return null;
        return task.Result;
    }

}
