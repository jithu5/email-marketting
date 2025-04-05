export function AsyncHandler (Func){
    return async (req, res, next) => {
        try {
            await Func(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}