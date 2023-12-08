using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace matrix_engine
{
    public partial class MatrixEngineGUI : Form
    {
        public MatrixEngineGUI(string args)
        {
            InitializeComponent();
            string URLStart = "https://fps-matrix-engine.vercel.app";
            var APP_PREDEFINED_FILE = System.Reflection.Assembly.GetEntryAssembly().Location + @"\me.txt";
            APP_PREDEFINED_FILE = APP_PREDEFINED_FILE.ToString().Replace(@"matrix-engine.exe\", @"");
            // MessageBox.Show(APP_PREDEFINED_FILE, File.Exists(APP_PREDEFINED_FILE).ToString());
            if (args.ToString() != "") {
                //  First priory is args ho comes with ./matrix-engine.exe url=localhost
                URLStart = args.Replace("url=", "");
                chromiumWebBrowser1.LoadUrl(URLStart);
            } else if (File.Exists(APP_PREDEFINED_FILE)) {
                // Next is me.txt
                StreamReader sr = new StreamReader(APP_PREDEFINED_FILE);
                var objects = JToken.Parse(sr.ReadToEnd().ToString());
                // MessageBox.Show("APP_STATUS: \n " + objects.Root[objects.Root["APP_STATUS"].ToString()], objects.Root["APP_STATUS"].ToString());
                // APP_STATUS
                URLStart = objects.Root[objects.Root["APP_STATUS"].ToString()].ToString();
                // 
                chromiumWebBrowser1.LoadUrl(URLStart);

            } else {
                chromiumWebBrowser1.LoadUrl(URLStart);
                this.Text = "Matrix-Engine [" + URLStart + "]";
            }
        }

        private void chromiumWebBrowser1_LoadingStateChanged(object sender, CefSharp.LoadingStateChangedEventArgs e)
        {

        }

        private void MatrixEngineGUI_Load(object sender, EventArgs e)
        {

        }
    }
}
