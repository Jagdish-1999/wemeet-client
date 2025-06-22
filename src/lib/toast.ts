import { toast } from "sonner";

export default class Toast {
    static success(
        message: string,
        options: Parameters<typeof toast.success>[1] = {}
    ) {
        toast.success(message, options);
    }

    static error(
        message: string,
        options: Parameters<typeof toast.error>[1] = {}
    ) {
        toast.error(message, options);
    }

    static info(
        message: string,
        options: Parameters<typeof toast.info>[1] = {}
    ) {
        toast.info(message, options);
    }

    static warning(
        message: string,
        options: Parameters<typeof toast.warning>[1] = {}
    ) {
        toast.warning(message, options);
    }

    static promise(
        prms: Promise<unknown>,
        loading: string = "loading",
        options: Parameters<typeof toast.promise>[1] = {}
    ) {
        toast.promise(prms, {
            ...options,
            loading: `${loading}`,
            success: (msg: unknown) => {
                return `${msg}`;
            },
            error: (err: unknown) => {
                return `${err}`;
            },
        });
    }

    static custom(
        element: (id: string | number) => React.ReactElement,
        options: Parameters<typeof toast.custom>[1] = {}
    ) {
        toast.custom(element, options);
    }
}
