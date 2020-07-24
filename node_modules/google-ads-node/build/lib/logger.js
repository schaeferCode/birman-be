"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(options) {
        this.options = {
            output: options.output || "stderr",
            verbosity: options.verbosity || "info",
            callback: options.callback || undefined,
        };
        this.resetLog();
    }
    setRequestMethod(method) {
        this.request.request.method = method;
    }
    setRequestHeaders(headers) {
        this.request.request.headers = headers;
    }
    setRequestBody(body) {
        this.request.request.body = body;
    }
    setResponseHeaders(headers) {
        this.request.response.headers = headers;
    }
    setResponseBody(body) {
        this.request.response.body = body;
    }
    setResponseStatus(status) {
        this.request.response.status = status;
    }
    setRequestIsMutation() {
        this.request.meta.is_mutation = true;
    }
    setStartTs() {
        this.start_ts = new Date();
    }
    setEndTs() {
        this.end_ts = new Date();
    }
    calculateElapsedMs() {
        if (!this.end_ts || !this.start_ts) {
            return;
        }
        // @ts-ignore This is okay
        const ms = this.end_ts - this.start_ts;
        this.request.meta.elapsed_ms = ms;
    }
    log() {
        let output = "";
        this.calculateElapsedMs();
        if (this.options.verbosity === "warning") {
            output = this.getWarningMessage();
        }
        else if (this.options.verbosity === "debug") {
            output = this.getDebugMessage();
        }
        else {
            output = this.getInfoMessage();
        }
        if (this.options.output === "stdout") {
            process.stdout.write(output);
        }
        if (this.options.output === "stderr") {
            process.stderr.write(output);
        }
        if (this.options.callback) {
            this.options.callback(this.request);
        }
        this.resetLog();
    }
    getDebugMessage() {
        return `\n${JSON.stringify(this.request.request)}\n`;
    }
    getInfoMessage() {
        return `\n${JSON.stringify(this.request)}\n`;
    }
    getWarningMessage() {
        return `\n${JSON.stringify(this.request.response)}\n`;
    }
    resetLog() {
        const default_meta = {
            is_mutation: false,
            elapsed_ms: undefined,
        };
        this.request = {
            request: { method: undefined, headers: undefined, body: undefined },
            response: { headers: undefined, body: undefined, status: undefined },
            meta: default_meta,
        };
        this.start_ts = undefined;
        this.end_ts = undefined;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBdUJBLE1BQWEsTUFBTTtJQU1qQixZQUFZLE9BQW1CO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sSUFBSSxRQUFRO1lBQ2xDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxJQUFJLE1BQU07WUFDdEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksU0FBUztTQUN4QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxNQUFjO1FBQ3BDLElBQUksQ0FBQyxPQUFRLENBQUMsT0FBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekMsQ0FBQztJQUVNLGlCQUFpQixDQUFDLE9BQVk7UUFDbkMsSUFBSSxDQUFDLE9BQVEsQ0FBQyxPQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQyxDQUFDO0lBRU0sY0FBYyxDQUFDLElBQVM7UUFDN0IsSUFBSSxDQUFDLE9BQVEsQ0FBQyxPQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRU0sa0JBQWtCLENBQUMsT0FBWTtRQUNwQyxJQUFJLENBQUMsT0FBUSxDQUFDLFFBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzVDLENBQUM7SUFFTSxlQUFlLENBQUMsSUFBUztRQUM5QixJQUFJLENBQUMsT0FBUSxDQUFDLFFBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxNQUFXO1FBQ2xDLElBQUksQ0FBQyxPQUFRLENBQUMsUUFBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDMUMsQ0FBQztJQUVNLG9CQUFvQjtRQUN6QixJQUFJLENB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