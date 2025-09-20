import { Module } from "@nestjs/common";
import { DbConnections } from "./db.source";

@Module({
    providers:[...DbConnections],
    exports:[...DbConnections]
})

export class DbModule{}