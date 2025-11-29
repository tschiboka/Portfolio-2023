import { assoc, dissoc, pipe } from "ramda"
import { Session } from "./SessionContext.types";



export class LocalSession {
    private static instance: LocalSession | null
    private localSession: Session | null

    private constructor() {
        this.localSession = this.get();
    }

    static getInstance(): LocalSession {
        if (!LocalSession.instance) {
            LocalSession.instance = new LocalSession();
        }
        return LocalSession.instance;
    }

    get(): Session | null {
        const storage = JSON.parse(localStorage.getItem("tschiboka") || "{}");
        return storage.session || null;
    }

    set(session: Session): void {
        this.localSession = session;
        const storage = JSON.parse(localStorage.getItem("tschiboka") || "{}");
        const newStorage = pipe(assoc("session", this.localSession))(storage);
        localStorage.setItem("tschiboka", JSON.stringify(newStorage));
    }

    drop(): void {
        this.localSession = null;
        const storage = JSON.parse(localStorage.getItem('tschiboka') || '{}');
        const newStorage = dissoc('session')(storage);
        localStorage.setItem('tschiboka', JSON.stringify(newStorage));
    }
}