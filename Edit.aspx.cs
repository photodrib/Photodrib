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
    int photoID;
    
    protected void Page_Load(object sender, EventArgs e)
    {
       
        buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            Response.Write("null");
            return;
        }
        try
        {
            photoID = int.Parse(Request["id"]);
        }
        catch (Exception)
        {
            picture.Src = "./img/AngryBirds.jpg";
            return;
        }
        var task = buddyUser.GetPicture(photoID);
        
        Response.Write(photoID);
           
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
        int contrast, brightness, newID = -1;
        float resize;
        try
        {
            resize = float.Parse(Request["resize"])/100;
            if (resize > 4)
            {
                resize = -1;
            }
        }
        catch (Exception)
        {
            resize = -1;
        }
        try
        {
            contrast = int.Parse(Request["contrast"]);
            if (contrast > 100)
            {
                contrast = -1;
            }
        }
        catch (Exception)
        {
            contrast = -1;
        }
        try
        {
            brightness = int.Parse(Request["brightness"]);
            if (brightness > 100)
            {
                brightness = -1;
            }
        }
        catch (Exception)
        {
            brightness = -1;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        /*
         * client.Pictures_Filters_GetListCompleted += (object sdr, Pictures_Filters_GetListCompletedEventArgs evt) =>
         {
            if (evt.Cancelled)
            {
                return;
            }
            var rst = evt.Result;
            var a=rst[0];
            for (var i = 0; i < rst.Count; i++)
            {
                a = rst[i];
                Response.Write(a.FilterID);
                Response.Write("\n");
                Response.Write(a.ParameterList);
                Response.Write("\n");
                Response.Write(a.FilterName);
                Response.Write("\n");
            }
            Response.Write(rst.Count);
        };
        */
        client.Pictures_Filters_GetListAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS);
        EventWaitHandle wh = new EventWaitHandle(false, EventResetMode.AutoReset);
        
        client.Pictures_Filters_ApplyFilterCompleted += (object sdr, Pictures_Filters_ApplyFilterCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                return;
            }
            newID = int.Parse(evt.Result);
            wh.Set();
        };
    
        client.Pictures_Filters_ApplyFilterAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, photoID.ToString(), "Scalar Factor", resize.ToString(), "0");
        if (contrast > 0)
        {
            wh.WaitOne();
            client.Pictures_Filters_ApplyFilterAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, newID.ToString(), "Contrast", contrast.ToString(), "1");
        }
        if (brightness > 0)
        {
            wh.WaitOne();
            client.Pictures_Filters_ApplyFilterAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, newID.ToString(), "Brightness", brightness.ToString(), "1");
        }
    }

}
