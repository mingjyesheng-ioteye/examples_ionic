import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {

  data = { rowid:0, date:"", type:"", description:"", duration:0 };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
      this.getCurrentData(navParams.get("rowid"));
  }

  onClickHome() {
    this.navCtrl.setRoot('SQLitePage');
  }
  
  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM task WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.date = res.rows.item(0).date;
            this.data.type = res.rows.item(0).type;
            this.data.description = res.rows.item(0).description;
            this.data.duration = res.rows.item(0).duration;
          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE task SET date=?,type=?,description=?,duration=? WHERE rowid=?',[this.data.date,this.data.type,this.data.description,this.data.duration,this.data.rowid])
        .then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
    this.navCtrl.setRoot('SQLitePage');
  }

}
