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
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            chromiumWebBrowser1.LoadUrl("https://fps-matrix-engine.vercel.app");
        }

        private void chromiumWebBrowser1_LoadingStateChanged(object sender, CefSharp.LoadingStateChangedEventArgs e)
        {

        }
    }
}
