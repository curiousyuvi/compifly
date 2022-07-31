import { UserDoc } from './UserDoc'

export type UserDocWithRating = {
    userDoc: UserDoc;
    codechefRating: number | null;
    codeforcesRating: number | null;
}