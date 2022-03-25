import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from './../Services/notes.service';
import jwt_decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  allNotes: any;
  token: any;
  decoded: any;
  errors: string = '';
  isLoad: boolean = false;

  addNote: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null, [Validators.required]),
  });
  constructor(private _Router: Router, private _NotesService: NotesService) {}

  ngOnInit(): void {
    this.getAllNotes();
  }
  getAllNotes() {
    this.token = localStorage.getItem('TOKEN');
    this.decoded = jwt_decode(this.token || '{}');

    let data = {
      token: this.token,
      userID: this.decoded._id,
    };
    this._NotesService.getAllNotes(data).subscribe((res) => {
      if (res.message == 'success' || res.message == 'no notes found') {
        this.isLoad = true;
        this.allNotes = res.Notes;
      } else {
        localStorage.clear();
        this._Router.navigate(['/sign-in']);
      }
    });
  }

  addData() {
    let data = {
      title: this.addNote.value.title,
      desc: this.addNote.value.desc,
      token: this.token,
      citizenID: this.decoded._id,
    };
    if (this.addNote.status == 'VALID') {
      this._NotesService.addNote(data).subscribe((res) => {
        if (res.message == 'success') {
          $('#addNote').modal('hide');
          this.getAllNotes();
        } else {
          this.errors = res.message;
        }
      });
    } else {
    }
  }

  //  ==================  delete note  =================
  Note_ID: string = ``;
  getId(id: string) {
    this.Note_ID = id;
  }
  deletedNote() {
    let data = {
      token: this.token,
      NoteID: this.Note_ID,
    };

    this._NotesService.deletNote(data).subscribe((res) => {
      if (res.message == 'deleted') {
        $('#DeleteNote').modal('hide');
        this.getAllNotes();
      }
    });
  }

  // =============================     Update Notes                  ===========================
  setNote() {
    for (let i = 0; i < this.allNotes.length; i++) {
      if (this.allNotes[i]._id == this.Note_ID) {
        // this.addNote.value.title.setValue(this.allNotes[i].title);
        this.addNote.controls['title'].setValue(this.allNotes[i].title);
        this.addNote.controls['desc'].setValue(this.allNotes[i].desc);
      }
    }
  }

  editNote() {
    let data = {
      title: this.addNote.value.title,
      desc: this.addNote.value.desc,
      NoteID: this.Note_ID,
      token: this.token,
    };
    this._NotesService.updateNote(data).subscribe((res) => {
      if (res.message == 'updated') {
        this.addNote.reset();

        this.getAllNotes();
        $('#EditNote').modal('hide');
      }
    });
  }
}
