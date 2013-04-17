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
        if (!Profile.IsAnonymous)
        {
            Response.Cookies.Add(new HttpCookie("p", Profile.Tiles)
            {
                Expires = DateTime.Now.AddDays(30)
            });
            if (Session["buddyUser"] == null)
            {
                BuddyClient client = BuddyApplication.Create();
                var task = client.Login(Profile.BuddyToken);
                task.Wait();
                if (!task.IsCanceled && !task.IsFaulted)
                {
                    Session["buddyUser"] = task.Result;
                }
            }
        }
    }

    protected void EditButton_Click1(object sender, EventArgs e)
    {
        float contrast;
        string param;

        try
        {
            contrast = GetArg("contrast");
        }
        catch (Exception)
        {
            return;
        }
        param = "Contrast=" + contrast.ToString() + ";";
        ApplyFilter("Color Operations", param);
    }

    protected void EditButton_Click2(object sender, EventArgs e)
    {
        float brightness;
        string param;

        try
        {
            brightness = GetArg("brightness");
        }
        catch (Exception)
        {
            return;
        }
        param = "Brightness=" + brightness.ToString() + ";";
        ApplyFilter("Color Operations", param);
    }

    protected void EditButton_Click3(object sender, EventArgs e)
    {
        float resize;
        string param;

        try
        {
            resize = GetArg("resize");
        }
        catch (Exception)
        {
            return;
        }
        param = "Scale Factor=" + resize.ToString() + ";";
        ApplyFilter("Basic Operations", param);
    }

    private float GetArg(string reqArg)
    {
        float arg;
        arg = float.Parse(Request[reqArg]) / 100;
        if (arg > 4)
        {
            throw new InvalidDataException();
        }
        return arg;
    }

    private void ApplyFilter(string filterName, string param)
    {
        int photoID;
        string nextUrl;
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        try
        {
            photoID = int.Parse(Request["id"]);
        }
        catch (Exception)
        {
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();

        client.Pictures_Filters_ApplyFilterCompleted += (object sdr, Pictures_Filters_ApplyFilterCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                return;
            }
            int newID;
            try
            {
                newID = int.Parse(evt.Result);
            }
            catch (Exception)
            {
                return;
            }
            nextUrl = "../Tiles/album/ShowPhoto.html?uid=" + buddyUser.ID + "&pid=" + newID.ToString();
            Response.Redirect(nextUrl);
        };
        client.Pictures_Filters_ApplyFilterAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, photoID.ToString(), filterName, param, "0");
    }
}
