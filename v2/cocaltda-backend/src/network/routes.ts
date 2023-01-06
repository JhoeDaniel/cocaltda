// import { routerAuth } from '../app/core/auth/auth.network';
// import { routerCompany } from '../app/core/company/company.network';
// import { routerNavigation } from '../app/core/navigation/navigation.network';
// import { routerProfile } from '../app/core/profile/profile.network';
// import { routerProfileNavigation } from '../app/core/profile_navigation/profile_navigation.network';
// import { routerSession } from '../app/core/session/session.network';
// import { routerSystemEvent } from '../app/core/system_event/system_event.network';
// import { routerTypeUser } from '../app/core/type_user/type_user.network';
// import { routerUser } from '../app/core/user/user.network';
// import { routerValidation } from '../app/core/validation/validation.network';
import { routerAuth } from '../app/public/auth/auth.network';
import { routerContact } from '../app/public/contact/contact.network';
import { routerIndex } from '../app/public/index/index.network';
import { routerReport } from '../app/report/report.network';

export const appRoutes = (app: any) => {
	/**
	 * Core Routes
	 */
	// app.use('/app/core/auth', routerAuth);

	// app.use('/app/core/company', routerCompany);
	// app.use('/app/core/validation', routerValidation);

	// app.use('/app/core/navigation', routerNavigation);
	// app.use('/app/core/profile', routerProfile);
	// app.use('/app/core/type_user', routerTypeUser);
	// app.use('/app/core/profile_navigation', routerProfileNavigation);

	// app.use('/app/core/user', routerUser);
	// app.use('/app/core/session', routerSession);
	// app.use('/app/core/system_event', routerSystemEvent);
	/**
	 * Public Route
	 */
	app.use('/app/public/contact', routerContact);
	app.use('/app/public/auth', routerAuth);
	app.use('/app/public/index', routerIndex);
	/**
	 * Report Route
	 */
	app.use('/app/report', routerReport);
};
