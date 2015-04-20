

class Action {

    public constructor(options: lark.CompileOptions) {
        this.options = options;
        this.projectDir = options.projectDir;
    }

    public projectDir: string;
    public options: lark.CompileOptions;

    public run(): void {

    }
}

export = Action;