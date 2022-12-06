using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
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

            if (args.ToString() != "")
            {
                URLStart = args.Replace("url=", "");
                chromiumWebBrowser1.LoadUrl(URLStart);
            }
            else {
                chromiumWebBrowser1.LoadUrl(URLStart);
                this.Text = "Matrix-Engine [" + URLStart + "]";
            }

        }

        private void chromiumWebBrowser1_LoadingStateChanged(object sender, CefSharp.LoadingStateChangedEventArgs e)
        {

        }
    }
}
