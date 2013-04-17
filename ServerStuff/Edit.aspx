<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Edit.aspx.cs" Inherits="Edit" MasterPageFile="ServerStuff.master" Async="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
    Edit Photo
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

    <div id="body">
        <br /><br /><br /><br /><br /><br /><br />
        <script type="text/javascript" src="Edit.js"></script>
        <div class="container metro">
            <form id="container"  runat="server">
            <table id="PhotoEdit">
                
                <tr>
                    <td>
                        <div class="metro-form">
                            <div class="metro-form-control" style="width: 300px">
                                <label>Change Contrast</label>
                                <div class="metro-text-box">
                                    <input name="contrast" type="number" min="0" max="400" />
                                    <span class="helper"></span>
                                </div>
                            </div>
                            <asp:Button ID="Button1" OnClick="EditButton_Click1" runat="server" CssClass="metro-button" Text="Edit" />
                            
                            <div class="metro-form-control" style="width: 300px">
                                <label>Change Brightness</label>
                                <div class="metro-text-box">
                                    <input name="brightness" type="number" min="0" max="400" />
                                    <span class="helper"></span>
                                </div>
                            </div>
                            <asp:Button ID="Button2" OnClick="EditButton_Click2" runat="server" CssClass="metro-button" Text="Edit" />
                            
                            <div class="metro-form-control" style="width: 300px">
                                <label>Resize (%)</label>
                                <div class="metro-text-box">
                                    <input name="resize" type="number" min="0" max="400" />
                                    <span class="helper"></span>
                                </div>
                            </div>
                            <asp:Button ID="EditButton" OnClick="EditButton_Click3" runat="server" CssClass="metro-button" Text="Edit" />

                            <input type="hidden" name="id" value="<%= Request["id"] %>" />

                            <br /><br />
                           
                                   
                            <input type="reset" ID="ClearButton" class="metro-button" value="Clear" />
                        </div>
                    </td>
                    <td>
                        <div><img id="picture"  /></div>
                            
                       
                    </td>
                    </tr> 
                </table>

            </form> 
        </div>
        
    </div> 
</asp:Content>

