import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Problem } from '../interfaces/problem';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ProblemService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  countWords(englishText: string) {
    return englishText.split(' ').filter((word) => word !== '').length;
  }

  createBlankIndexes(textLength: number, ratio = 0.2) {
    const blankIndexes: number[] = [];
    for (let i = 0; i < textLength + 1; i++) {
      if (Math.random() <= ratio) {
        blankIndexes.push(i);
      }
    }
    return blankIndexes;
  }

  createProblem(
    problem: Omit<
      Problem,
      'japaneseText' | 'blankIndexes' | 'correctAnswerRate' | 'createdAt'
    >,
    type: string
  ) {
    const problemId = this.db.createId();
    const blankIndexes = this.createBlankIndexes(
      this.countWords(problem.englishText)
    );

    this.db
      .doc<Problem>(`problems/${this.authService.uid}/${type}/${problemId}`)
      .set({
        ...problem,
        japaneseText: '和訳文',
        blankIndexes,
        correctAnswerRate: 0,
        createdAt: firebase.default.firestore.Timestamp.now(),
      });
  }
}
