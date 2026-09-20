
SMODULE.NEW_OBJECT("IamPathGameObject", 10, 10, SYS.MATH.CONVERT.PIX_TO_PER(100), SYS.MATH.CONVERT.PIY_TO_PER(100), 1);

IamPathGameObject.CREATE_PENCIL();

SMODULE.NEW_OBJECT("HOLDER", 10, 5, 36, 32, 1);
HOLDER.CUSTOM = function () {
    SURF.fillStyle = "rgba(0,64,128,0.7)";
    SURF.fillRect(this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());

};
HOLDER.TYPE_OF_GAME_OBJECT = "CUSTOM";

SMODULE.NEW_OBJECT("REC_PATH", 10, 8, 18, 5, 1);
REC_PATH.CREATE_TEXTBOX("Stop Recording", 10, "black", "red");
REC_PATH.TEXTBOX.EDIT = false;
REC_PATH.TEXTBOX.font =  "13px Arial";

SMODULE.NEW_OBJECT("PATH__CLEAR", 28, 8, 18, 5, 1);
PATH__CLEAR.CREATE_TEXTBOX("Clear and Start Recording after 3s", 10, "black", "red");
PATH__CLEAR.TEXTBOX.EDIT = false;
PATH__CLEAR.TEXTBOX.font = "13px Arial";

SMODULE.NEW_OBJECT("SWITH_DRAW_TYPE", 10, 13, 18, 5, 1);
SWITH_DRAW_TYPE.CREATE_TEXTBOX("Draw type : POINTS ", 10, "black", "red");
SWITH_DRAW_TYPE.TEXTBOX.EDIT = false;
SWITH_DRAW_TYPE.TEXTBOX.font = "13px Arial";

SMODULE.NEW_OBJECT("NAME_FOR_SAVE", 28, 13, 18, 5, 1);
NAME_FOR_SAVE.CREATE_TEXTBOX("Enter name here", 10, "black", "lime");
NAME_FOR_SAVE.TEXTBOX.EDIT = true;
NAME_FOR_SAVE.TEXTBOX.font =  "13px Arial";

SMODULE.NEW_OBJECT("SAVE_TO_LS", 28, 18, 18, 5, 1);
SAVE_TO_LS.CREATE_TEXTBOX("Save to localstorage", 10, "black", "green");
SAVE_TO_LS.TEXTBOX.EDIT = false;
SAVE_TO_LS.TEXTBOX.font =  "13px Arial";

SMODULE.NEW_OBJECT("SWITH_RECORD_TYPE", 10, 18, 18, 5, 1);
SWITH_RECORD_TYPE.CREATE_TEXTBOX("ON_MOUSE_MOVE", 10, "black", "green");
SWITH_RECORD_TYPE.TEXTBOX.EDIT = false;
SWITH_RECORD_TYPE.TEXTBOX.font =  "13px Arial";

SMODULE.NEW_OBJECT("__CLEAR", 10, 23, 18, 5, 1);
__CLEAR.CREATE_TEXTBOX("Pencil clear", 10, "black", "green");
__CLEAR.TEXTBOX.EDIT = false;
__CLEAR.TEXTBOX.font =  "13px Arial";

__CLEAR.TAP = function () {
    IamPathGameObject.PENCIL.CLEAR();
};

SAVE_TO_LS.TAP = function () {

    IamPathGameObject.PENCIL.SAVE_DRAWS(NAME_FOR_SAVE.TEXTBOX.TEXT);

};

SMODULE.NEW_OBJECT("dataAboutPencil", 10, 28, 36, 5, 1);
dataAboutPencil.CREATE_TEXTBOX("Pencil control", 10, "black", "green");
dataAboutPencil.TEXTBOX.EDIT = false;
dataAboutPencil.TEXTBOX.font =  "13px Arial";
dataAboutPencil.ON_UPDATE_SYS = function () {

    dataAboutPencil.TEXTBOX.TEXT = "Buffer size:" + IamPathGameObject.PENCIL.PATH.length + " . Keep low value < 1000 .";

};
//dataAboutPencil.TEXTBOX.TEXT = IamPathGameObject.PENCIL.PATH.length;
SWITH_DRAW_TYPE.status_ = 0;
SWITH_DRAW_TYPE.TAP = function () {

    if (SWITH_DRAW_TYPE.status_ == 0) {

        IamPathGameObject.PENCIL.DRAW_TYPE("LINES");
        SWITH_DRAW_TYPE.TEXTBOX.TEXT = "Draw type - LINES";
        SWITH_DRAW_TYPE.status_ = 1;

    } else if (SWITH_DRAW_TYPE.status_ == 1) {

        IamPathGameObject.PENCIL.DRAW_TYPE("STRIP_LINES");
        SWITH_DRAW_TYPE.TEXTBOX.TEXT = "Draw type - STRIP_LINES";
        SWITH_DRAW_TYPE.status_ = 2;

    } else if (SWITH_DRAW_TYPE.status_ == 2) {

        IamPathGameObject.PENCIL.DRAW_TYPE("STRIP_LINES2");
        SWITH_DRAW_TYPE.TEXTBOX.TEXT = "Draw type - STRIP_LINES2";
        SWITH_DRAW_TYPE.status_ = 3;

    } else if (SWITH_DRAW_TYPE.status_ == 3) {

        IamPathGameObject.PENCIL.DRAW_TYPE("BALLS");
        SWITH_DRAW_TYPE.TEXTBOX.TEXT = "Draw type - BALLS";
        SWITH_DRAW_TYPE.status_ = 0;

    }

};

SWITH_RECORD_TYPE.status = 0;
SWITH_RECORD_TYPE.TAP = function () {

    if (SWITH_RECORD_TYPE.status == 0) {

        IamPathGameObject.PENCIL.RECORD_TYPE("ON_TAP");
        SWITH_RECORD_TYPE.TEXTBOX.TEXT = "Rec on leftClick - right stops ";
        SWITH_RECORD_TYPE.status = 1;
    } else if (SWITH_RECORD_TYPE.status == 1) {

        IamPathGameObject.PENCIL.RECORD_TYPE("EVERY_POINT");
        SWITH_RECORD_TYPE.TEXTBOX.TEXT = "Rec on touchMove";
        SWITH_RECORD_TYPE.status = 0;

    }

};

PATH__CLEAR.TAP = function () {

    IamPathGameObject.PENCIL.RECORD = false;

    IamPathGameObject.PENCIL.CLEAR();

    IamPathGameObject.ON_UPDATE_SYS = IamPathGameObject.ON_UPDATE_SYS_RECORD_ONLY_TAP; //clear colector
    setTimeout(function () {
        IamPathGameObject.PENCIL.RECORD = true;
        REC_PATH.TEXTBOX.TEXT = "Stop recording";

    }, 3000);
};

REC_PATH.status = 0;
REC_PATH.TAP = function () {

    if (REC_PATH.status == 0) {

        IamPathGameObject.PENCIL.RECORD = false;
        REC_PATH.TEXTBOX.TEXT = "Start recording for 3s";
        REC_PATH.status = 1;

    } else if (REC_PATH.status == 1) {

        REC_PATH.status = 100;
        REC_PATH.TEXTBOX.TEXT = "Stop recording for 3s";
        setTimeout(function () {

            IamPathGameObject.PENCIL.RECORD = true;
            REC_PATH.status = 0;

        }, 3000);

    }

};

HOLDER.GROUP.ADD(dataAboutPencil.NAME);
HOLDER.GROUP.ADD(SWITH_DRAW_TYPE.NAME);
HOLDER.GROUP.ADD(SWITH_RECORD_TYPE.NAME);
HOLDER.GROUP.ADD(REC_PATH.NAME);
HOLDER.GROUP.ADD(PATH__CLEAR.NAME);
HOLDER.GROUP.ADD(__CLEAR.NAME);

HOLDER.GROUP.ADD(NAME_FOR_SAVE.NAME);
HOLDER.GROUP.ADD(SAVE_TO_LS.NAME);

setTimeout(function () {}, 2111);

function RECORD_PENCIL() {

    delete IamPathGameObject.PENCIL;
    IamPathGameObject.CREATE_PENCIL();
    try {
        NIK.recognition.stop();
    } catch (e) {}
    setTimeout(function () {
        NIK = new SYS.VOICE.LISTEN("remember", SAVE_PENCIL);
    }, 1000);

}

function SAVE_PENCIL() {

    IamPathGameObject.PENCIL.SAVE_DRAWS("NIDZA12");
    NIK.recognition.stop();
    delete IamPathGameObject.PENCIL;
    IamPathGameObject.CREATE_PENCIL();
    NIK = new SYS.VOICE.LISTEN("record", RECORD_PENCIL);
}

var NIK = new SYS.VOICE.LISTEN("record", RECORD_PENCIL);
