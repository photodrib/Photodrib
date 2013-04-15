<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Edit.aspx.cs" Inherits="Edit" MasterPageFile="~/Photodrib.master" %>
<%@ OutputCache NoStore="true" Location="None"  %>

<asp:Content ID="Content1" ContentPlaceHolderID="scripts" runat="server">
    <!-- Copyright 2012 Omar AL Zabir -->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>    
    
<% if (Request.IsLocal) { %>    
    <!-- 
        If you change any of the below javascript files, make sure you run the Combine.bat
        file in the /js folder to generate the CombinedDashboard.js file again. And then don't
        forget to update the ?v=14#. Otherwise user's will have cached copies in their browser
        and won't get the newly deployed file. -->
    <script type="text/javascript" src="js/TheCore.js?v=14"></script>
    <script type="text/javascript" src="tiles/tiles.js?v=14"></script>
    <script type="text/javascript" src="js/Dashboard.js?v=14"></script>
    
<% } else { %>    
    <script type="text/javascript" src="js/CombinedDashboard.js?v=14"></script>
<% } %>

    <script type="text/javascript">
        $(document).ready(function () {
            <%= GetAlerts() %>
        });
    </script>
    
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div id="body" class="unselectable">
        <div id="navbar" class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <a class="pull-left" style="margin-top: 7px; margin-right: 5px;" href="">
                        <img src="img/avatar474_2.gif" style="max-height: 16px;" />
                    </a>
                    <h1><a class="brand" href="?">Photodrib</a></h1>
                    <div class="nav-collapse">
                        <ul class="nav">
                            <li><a class="active" href="?"><i class="icon-th-large"></i>Dashboard</a></li>
                            <li><a href="AppStore.aspx"><i class="icon-shopping-cart"></i>Apps</a></li>
                            <li>
                                <form id="googleForm" class="navbar-search pull-left" action="http://www.google.com/search" target="_blank">
                                    <input id="googleSearchText" type="text" class="search-query span2" name="q" placeholder="Google">
                                </form>
                            </li>
                        </ul>
                        <ul class="nav pull-right">
                            <%--<li><a href="javascript:fullscreen()"><i class="icon-facetime-video"></i>Go Fullscreen</a></li>--%>
                            <li><a href="ServerStuff/Logout.ashx"><i class="icon-refresh"></i>Reset</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-tint"></i>Theme<b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#" onclick="ui.switchTheme('theme-green')">Green</a></li>
                                    <li><a href="#" onclick="ui.switchTheme('theme-white')">White</a></li>
                                    <li><a href="#" onclick="ui.switchTheme('theme-Bloom')">Bloom</a></li>                                    
                                </ul>
                            </li>                            
                            <li data-bind="if: user().isAnonymous"><a onclick="ui.login()" href="#login"><i class="icon-user"></i>Login</a></li>
                            <li data-bind="if: !user().isAnonymous"><a href="ServerStuff/Logout.ashx"><i class="icon-user"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div id="content" style="visibility: hidden">
            <div id="start" data-bind="text: photo_editor">Photo Editor </div>
            <div id="user" data-bind="with: user" onclick="ui.settings()">
                <div id="name">
                    <div id="firstname" data-bind="text: firstName">Omar</div>
                    <div id="lastname" data-bind="text: lastName">AL Zabir</div>
                </div>
                <div id="photo">
                    <img src="img/User No-Frame.png" data-bind="attr: {src: photo}" width="40" height="40" />
                </div>
            </div>
            <div id="browser_incompatible" class="alert">
                <button class="close" data-dismiss="alert">¡Á</button>
                <strong>Warning!</strong>
                Your browser is incompatible with Photodrib. Please use Internet Explorer 9+, Chrome, Firefox or Safari.
            </div>
            <div id="CombinedScriptAlert" class="alert">
                <button class="close" data-dismiss="alert">¡Á</button>
                <strong>Warning!</strong>
                Combined javascript files are outdated. 
                Please retun the js\Combine.bat file. 
                Otherwise it won't work when you will deploy on a server.
            </div>
        </div>
            
            
            <br /><br /><br /><br /><br /><br /><br />
            
        <div class="container metro">
            <table id="PhotoEdit">
                <tr>
                    <td>
                        <form id="EditForm" class="metro-form"  runat="server">
                            <div class="metro-form-control" style="width: 300px">
                                <label>Contrast</label>
                                <div class="metro-text-box">
                                    <input name="contrast" type="number" min="0" max="100" />
                                    <span class="helper"></span>
                                </div>
                            </div>

                            <div class="metro-form-control" style="width: 300px">
                                <label>Brightness</label>
                                <div class="metro-text-box">
                                    <input name="brightness" type="number" min="0" max="100" />
                                    <span class="helper"></span>
                                </div>
                            </div>
                                  
                            <div class="metro-form-control" style="width: 300px">
                                <label>Length</label>
                                <div class="metro-text-box">
                                    <input name="length" type="number" min="1" max="100" />
                                    <span class="helper"></span>
                                </div>
                            </div>

                            <div class="metro-form-control" style="width: 300px">
                                <label>Width</label>
                                <div class="metro-text-box">
                                    <input name="width" type="number" min="1" max="100" />
                                    <span class="helper"></span>
                                </div>
                            </div>



                            <br /><br /><br />
                            <asp:Button ID="EditButton" OnClick="EditButton_Click" runat="server" CssClass="metro-button" Text="Edit" />
                                   
                            <input type="reset" ID="ClearButton" class="metro-button" value="Clear" />
                        </form>


                    </td>
                    <td>
                            <img src="./img/AngryBirds.jpg"/>
                    </td>
                </tr>                    
            </table>
        </div>
        
    </div>
</asp:Content>

