﻿#pragma checksum "C:\Users\Hatice Varlık\Desktop\nenerede\nenerede\platforms\wp8\MainPage.xaml" "{406ea660-64cf-4c82-b6f0-42d48172a799}" "E6EE9C36016ADE2E24283FF1B90C6E74"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.34014
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using System;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Automation.Peers;
using System.Windows.Automation.Provider;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Resources;
using System.Windows.Shapes;
using System.Windows.Threading;
using WPCordovaClassLib;


namespace com.mobileservices.nenerede {
    
    
    public partial class MainPage : Microsoft.Phone.Controls.PhoneApplicationPage {
        
        internal Microsoft.Phone.Shell.ApplicationBarIconButton AppbarButtonMain;
        
        internal Microsoft.Phone.Shell.ApplicationBarIconButton AppbarButtonSearch;
        
        internal Microsoft.Phone.Shell.ApplicationBarIconButton AppbarButtonProfile;
        
        internal System.Windows.Controls.Grid LayoutRoot;
        
        internal WPCordovaClassLib.CordovaView CordovaView;
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Windows.Application.LoadComponent(this, new System.Uri("/com.mobileservices.nenerede;component/MainPage.xaml", System.UriKind.Relative));
            this.AppbarButtonMain = ((Microsoft.Phone.Shell.ApplicationBarIconButton)(this.FindName("AppbarButtonMain")));
            this.AppbarButtonSearch = ((Microsoft.Phone.Shell.ApplicationBarIconButton)(this.FindName("AppbarButtonSearch")));
            this.AppbarButtonProfile = ((Microsoft.Phone.Shell.ApplicationBarIconButton)(this.FindName("AppbarButtonProfile")));
            this.LayoutRoot = ((System.Windows.Controls.Grid)(this.FindName("LayoutRoot")));
            this.CordovaView = ((WPCordovaClassLib.CordovaView)(this.FindName("CordovaView")));
        }
    }
}

