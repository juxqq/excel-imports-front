import {Component, OnInit} from '@angular/core';
import {GroupService} from "./group/group.service";
import {Group} from "./interfaces/group";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = "excel-imports-front";
  group = {} as Group;
  submit: boolean = false;
  deleteSuccess: boolean = false;
  groups: Group[] = [];
  newGroup: Group = {
    nomDuGroupe: '',
    origine: '',
    ville: '',
    anneeDebut: 0,
    anneeSeparation: 0,
    fondateurs: '',
    membres: 0,
    courantMusical: '',
    presentation: new Text(),
  };

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    const storedGroups = localStorage.getItem("groups");
    if (storedGroups) {
      this.groups = JSON.parse(storedGroups);
    }
  }

  onGetGroups(): void {
    const storedGroups = localStorage.getItem("groups");
    if (!storedGroups) {
      this.groupService.getGroups().subscribe(
        (response) => {
          this.groups = response;
          localStorage.setItem("groups", JSON.stringify(this.groups));
        }
      );
    }
  }

  onCreateGroup(event: any): void {
    let file = event.target.files[0];
    this.groupService.createGroup(file).subscribe(
      (response) => {
        this.group = response;
        this.onGetGroups();
      }
    );
  }

  onGetGroup(id: number): void {
    this.submit = true;
    this.groupService.getGroup(id).subscribe(
      (response) => {
        console.log(response);
        this.group = response;
      }
    );
  }

  onUpdateGroup(id: number): void {
    this.groupService.updateGroup(this.newGroup, id).subscribe(
      (response) => {
        this.group = response;
        this.onGetGroups();
      }
    )
  }

  onDeleteGroup(id: number): void {
    this.submit = true;
    this.groupService.deleteGroup(id).subscribe(
      (response) => {
        this.deleteSuccess = !!response;
      }
    );
  }

  emptyCache() {
    localStorage.removeItem("groups");
    this.groups = [];
  }
}
