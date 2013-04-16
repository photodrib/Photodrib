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


    protected void Page_Load(object sender, EventArgs e)
    {

        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        try
        {
            int photoID = int.Parse(Request["id"]);
        }
        catch (Exception)
        {

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
    protected void EditButton_Click1(object sender, EventArgs e)
    {
        int newID = -1;
        int photoID;
        float contrast; ;
        string param="",nextUrl;
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        try
        {
            photoID = int.Parse(Request["id"]);
        }
        catch (Exception)
        {
            return;
        }
        try
        {
            contrast = int.Parse(Request["contrast"]) / 100f;
            if (contrast > 4)
            {
                return;
            }
        }
        catch (Exception)
        {
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        EventWaitHandle wh = new EventWaitHandle(false, EventResetMode.AutoReset);

        client.Pictures_Filters_ApplyFilterCompleted += (object sdr, Pictures_Filters_ApplyFilterCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                return;
            }
            try
            {
                newID = int.Parse(evt.Result);
            }
            catch (Exception)
            {
                return;
            }
            nextUrl = "../Tiles/album/ShowPhoto.html?id=" + newID.ToString();
            Response.Redirect(nextUrl);
        };
        param = "Contrast=" + contrast.ToString() + ";";
        client.Pictures_Filters_ApplyFilterAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, photoID.ToString(), "Color Operations", param, "0");
    }
    protected void EditButton_Click2(object sender, EventArgs e)
    {
        int newID = -1;
        int photoID;
        float brightness; ;
        string param, nextUrl;
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        try
        {
            photoID = int.Parse(Request["id"]);
        }
        catch (Exception)
        {
            return;
        }
        try
        {
            brightness = float.Parse(Request["contrast"]) / 100;
            if (brightness > 4)
            {
                return;
            }
        }
        catch (Exception)
        {
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        EventWaitHandle wh = new EventWaitHandle(false, EventResetMode.AutoReset);

        client.Pictures_Filters_ApplyFilterCompleted += (object sdr, Pictures_Filters_ApplyFilterCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                return;
            }
            try
            {
                newID = int.Parse(evt.Result);
            }
            catch (Exception)
            {
                return;
            }
            nextUrl = "../Tiles/album/ShowPhoto.html?id=" + newID.ToString();
            Response.Redirect(nextUrl);
        };
        param = "Brightness=" + brightness.ToString() + ";";
        client.Pictures_Filters_ApplyFilterAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, photoID.ToString(), "Color Operations", param, "0");
        
        

    }
    protected void EditButton_Click3(object sender, EventArgs e)
    {
        int newID = -1;
        int photoID;
        float resize;
        string param,nextUrl;
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        try
        {
            photoID = int.Parse(Request["id"]);
        }
        catch (Exception)
        {
            return;
        }
        try
        {
            resize = float.Parse(Request["resize"]) / 100;
            if (resize > 4)
            {
                return;
            }
        }
        catch (Exception)
        {
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        EventWaitHandle wh = new EventWaitHandle(false, EventResetMode.AutoReset);

        client.Pictures_Filters_ApplyFilterCompleted += (object sdr, Pictures_Filters_ApplyFilterCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                return;
            }
            try
            {
                newID = int.Parse(evt.Result);
            }
            catch (Exception)
            {
                return;
            }
            nextUrl = "../Tiles/album/ShowPhoto.html?id=" + newID.ToString();
            Response.Redirect(nextUrl);
        };
        param = "Scale Factor=" + resize.ToString() + ";";
        client.Pictures_Filters_ApplyFilterAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, photoID.ToString(), "Basic Operations", param, "0");
        
        
    }
}
