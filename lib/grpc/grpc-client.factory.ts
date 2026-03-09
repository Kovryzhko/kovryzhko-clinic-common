import { Injectable } from "@nestjs/common";
import { ClientGrpc, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { GrpcClientOptions } from "./grpc-client.interfaces";

@Injectable()
export class GrpcClientFactory {
    private clients = new Map<string, ClientGrpc>()

    public createClient(options: GrpcClientOptions) {
        return ClientProxyFactory.create({ transport: Transport.GRPC, options }) as ClientGrpc
    }

    public register(token: string, client: ClientGrpc) {
        this.clients.set(token, client)
    }

    public getClient(token: string) {
        const client = this.clients.get(token)

        if (!client) throw new Error('invalid grpc client token')

        return client
    }
} 