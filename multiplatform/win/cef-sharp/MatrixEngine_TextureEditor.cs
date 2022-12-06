using System.Windows.Forms;

namespace matrix_engine
{
    public partial class MatrixEngine_TextureEditor : Form
    {
        public MatrixEngine_TextureEditor(string arg)
        {
            InitializeComponent();
        }

        private void texture_editor_Load(object sender, System.EventArgs e)
        {
            textureEditor.LoadUrl(@"G:\web_server\xampp\htdocs\PRIVATE_SERVER\me\me\2DTextureEditor\actual.html");
        }
    }
}
