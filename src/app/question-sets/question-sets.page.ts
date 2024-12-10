import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router pro navigaci
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-question-sets',
  templateUrl: './question-sets.page.html',
  styleUrls: ['./question-sets.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput]
})
export class QuestionSetsPage implements OnInit {

  groups: { id: number; name: string }[] = [];
  newGroupName: string = ''; // Pro nový název skupiny
  private nextId: number = 1; // Interní ID pro každou skupinu

  constructor(private router: Router) { }

  ngOnInit() {
    // Můžete zde přidat nějaké počáteční skupiny nebo data, pokud je potřeba
  }

  // Přidání nové skupiny
  addGroup() {
    if (this.newGroupName.trim()) {
      this.groups.push({ id: this.nextId++, name: this.newGroupName });
      this.newGroupName = ''; // Vymazání inputu po přidání
    }
  }

  // Odebrání skupiny podle ID
  removeGroup(groupId: number) {
    this.groups = this.groups.filter(group => group.id !== groupId);
  }

  // Navigace na detail skupiny
  goToGroupDetail(groupId: number) {
    this.router.navigate(['/questions', groupId]); // Přejde na stránku detailu s parametrem ID
  }
}
