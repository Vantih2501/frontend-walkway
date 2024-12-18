export function Logger(req: any) {
	const logRequest = (status: string | number) => {
		console.log(
			'%s %s %s',
			req.method.padEnd('delete'.length, " "),
			req.url,
			status
		);
	};

	logRequest('(pending)');

	const originalCallback = req.callback;
	req.callback = (err: any, res: any) => {
		logRequest(res?.statusCode || 'error');
		originalCallback.call(req, err, res);
	};
}

