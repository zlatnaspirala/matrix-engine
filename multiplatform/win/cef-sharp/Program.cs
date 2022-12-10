using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace matrix_engine
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// Author Nikola Lukic zlatnaspirala@gmail.com
        /// Matrix-Engine 1.9.0 GUI for windows OS
        /// </summary>
        [STAThread]
        static void Main(string[] args)
        {
            if (args.Length > 0 && args[0].Contains("url"))
            {
                /* Run windows native app */
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new MatrixEngineGUI(args[0]));
            } 
            else {
                /* Run windows native app with default url */
                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new MatrixEngineGUI(""));
            }   
        }
    }
}
