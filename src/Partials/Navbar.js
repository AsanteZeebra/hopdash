
import { Link,useNavigate } from "react-router-dom";
import logout from "../Components/authentication/logout";

const Navbar = () => {
	 const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };
    return(
        <>
        <div className="app-header d-flex align-items-center">

				
				<div className="d-flex">
					<button className="toggle-sidebar" id="toggle-sidebar">
						<i className="bi bi-list lh-1"></i>
					</button>
					<button className="pin-sidebar" id="pin-sidebar">
						<i className="bi bi-list lh-1"></i>
					</button>
				</div>
				
				<div className="app-brand py-2 ms-3">
					<Link to="/dashbaord" className="d-sm-block d-none">
						<img src="assets/images/logo.svg" className="logo" alt="Bootstrap Gallery" />
					</Link>
					<Link to="/dashbaord" className="d-sm-none d-block">
						<img src="assets/images/logo-sm.svg" className="logo" alt="Bootstrap Gallery" />
					</Link>
				</div>
				
				<div className="header-actions col">
					<div className="d-lg-flex d-none">
						<div className="dropdown">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-grid fs-4 lh-1 text-secondary"></i>
							</a>
							<div className="dropdown-menu dropdown-menu-end shadow-lg">
								
								<div className="d-flex gap-2 m-2">
									<Link to="" className="g-col-4 p-2 border rounded-2">
										<img src="assets/images/brand-behance.svg" className="img-3x" alt="Admin Themes" />
									</Link>
									<Link to="" className="g-col-4 p-2 border rounded-2">
										<img src="assets/images/brand-gatsby.svg" className="img-3x" alt="Admin Themes" />
									</Link>
									<Link to="" className="g-col-4 p-2 border rounded-2">
										<img src="assets/images/brand-google.svg" className="img-3x" alt="Admin Themes" />
									</Link>
									<Link to="" className="g-col-4 p-2 border rounded-2">
										<img src="assets/images/brand-bitcoin.svg" className="img-3x" alt="Admin Themes" />
									</Link>
									<Link to="" className="g-col-4 p-2 border rounded-2">
										<img src="assets/images/brand-dribbble.svg" className="img-3x" alt="Admin Themes" />
									</Link>
								</div>
								
							</div>
						</div>
						<div className="dropdown border-start">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-exclamation-triangle fs-4 lh-1 text-secondary"></i>
								<span className="count-label warning"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-end shadow-lg">
								<h5 className="fw-semibold px-3 py-2 text-primary">
									Notifications
								</h5>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<div className="icon-box md bg-success rounded-circle me-3">
											<i className="bi bi-exclamation-triangle text-white fs-4"></i>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Rosalie Deleon</h6>
											<p className="mb-1">You have new order.</p>
											<p className="small m-0 text-secondary">30 mins ago</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<div className="icon-box md bg-danger rounded-circle me-3">
											<i className="bi bi-exclamation-octagon text-white fs-4"></i>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Donovan Stuart</h6>
											<p className="mb-1">Membership has been expired.</p>
											<p className="small m-0 text-secondary">2 days ago</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2">
										<div className="icon-box md bg-warning rounded-circle me-3">
											<i className="bi bi-exclamation-square text-white fs-4"></i>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Roscoe Richards</h6>
											<p className="mb-1">Payment pending. Pay now.</p>
											<p className="small m-0 text-secondary">3 days ago</p>
										</div>
									</div>
								</div>
								<div className="d-grid mx-3 my-1">
									<Link to="/" className="btn btn-primary">View all</Link>
								</div>
							</div>
						</div>
						<div className="dropdown border-start">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-bell fs-4 lh-1 text-secondary"></i>
								<span className="count-label info"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-end shadow-lg">
								<h5 className="fw-semibold px-3 py-2 text-primary">Updates</h5>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<div className="icon-box md bg-success rounded-circle me-3">
											<span className="fw-bold text-white">DS</span>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Douglass Shaw</h6>
											<p className="mb-1">
												Membership has been ended.
											</p>
											<p className="small m-0 text-secondary">Today, 07:30pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<div className="icon-box md bg-danger rounded-circle me-3">
											<span className="fw-bold text-white">WG</span>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Willie Garrison</h6>
											<p className="mb-1">
												Congratulate, James for new job.
											</p>
											<p className="small m-0 text-secondary">Today, 08:00pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2">
										<div className="icon-box md bg-warning rounded-circle me-3">
											<span className="fw-bold text-white">TJ</span>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Terry Jenkins</h6>
											<p className="mb-1">
												Lewis added new schedule release.
											</p>
											<p className="small m-0 text-secondary">Today, 09:30pm</p>
										</div>
									</div>
								</div>
								<div className="d-grid mx-3 my-1">
									<Link to="/" className="btn btn-primary">View all</Link>
								</div>
							</div>
						</div>
						<div className="dropdown border-start">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-envelope-open fs-4 lh-1 text-secondary"></i>
								<span className="count-label"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-end shadow-lg">
								<h5 className="fw-semibold px-3 py-2 text-primary">Messages</h5>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<img src="assets/images/user3.png" className="img-3x me-3 rounded-5" alt="Admin Theme" />
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Angelia Payne</h6>
											<p className="mb-1">
												Membership has been ended.
											</p>
											<p className="small m-0 text-secondary">Today, 07:30pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<img src="assets/images/user1.png" className="img-3x me-3 rounded-5" alt="Admin Theme" />
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Clyde Fowler</h6>
											<p className="mb-1">
												Congratulate, James for new job.
											</p>
											<p className="small m-0 text-secondary">Today, 08:00pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2">
										<img src="assets/images/user4.png" className="img-3x me-3 rounded-5" alt="Admin Theme" />
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Sophie Michiels</h6>
											<p className="mb-1">
												Lewis added new schedule release.
											</p>
											<p className="small m-0 text-secondary">Today, 09:30pm</p>
										</div>
									</div>
								</div>
								<div className="d-grid mx-3 my-1">
									<Link to="/" className="btn btn-primary">View all</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="dropdown ms-2">
						<a id="userSettings" className="dropdown-toggle d-flex py-2 align-items-center text-decoration-none" href="#!"
							role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="assets/images/user.png" className="rounded-2 img-3x" alt="Bootstrap Gallery" />
							<span className="ms-2 text-truncate d-lg-block d-none">Anne Santiago</span>
						</a>
						<div className="dropdown-menu dropdown-menu-end shadow-lg">
							<div className="header-action-links mx-3 gap-2">
								<a className="dropdown-item" href="profile.html"><i className="bi bi-person text-primary"></i>Profile</a>
								<a className="dropdown-item" href="settings.html"><i className="bi bi-gear text-danger"></i>Settings</a>
								<a className="dropdown-item" href="widgets.html"><i className="bi bi-box text-success"></i>Widgets</a>
							</div>
							<div className="mx-3 mt-2 d-grid">
								<Link onClick={handleLogout} className="btn btn-primary btn-sm">Logout</Link>
							</div>
						</div>
					</div>
				</div>
				

			</div>
        </>
    )
}

export const Branch_Navbar = () => {
	 const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };
    return(
        <>
        <div className="app-header d-flex align-items-center">

				
				<div className="d-flex">
					<button className="toggle-sidebar" id="toggle-sidebar">
						<i className="bi bi-list lh-1"></i>
					</button>
					<button className="pin-sidebar" id="pin-sidebar">
						<i className="bi bi-list lh-1"></i>
					</button>
				</div>
				
				<div className="app-brand py-2 ms-3">
					<Link to="/branch" className="d-sm-block d-none">
						<img src="assets/images/logo.svg" className="logo" alt="Bootstrap Gallery" />
					</Link>
					<Link to="/branch" className="d-sm-none d-block">
						<img src="assets/images/logo-sm.svg" className="logo" alt="Bootstrap Gallery" />
					</Link>
				</div>
				
				<div className="header-actions col">
					<div className="d-lg-flex d-none">
						<div className="dropdown">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-grid fs-4 lh-1 text-secondary"></i>
							</a>
							
						</div>
						<div className="dropdown border-start">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-exclamation-triangle fs-4 lh-1 text-secondary"></i>
								<span className="count-label warning"></span>
							</a>
							
						</div>
						<div className="dropdown border-start">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-bell fs-4 lh-1 text-secondary"></i>
								<span className="count-label info"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-end shadow-lg">
								<h5 className="fw-semibold px-3 py-2 text-primary">Updates</h5>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<div className="icon-box md bg-success rounded-circle me-3">
											<span className="fw-bold text-white">DS</span>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Douglass Shaw</h6>
											<p className="mb-1">
												Membership has been ended.
											</p>
											<p className="small m-0 text-secondary">Today, 07:30pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<div className="icon-box md bg-danger rounded-circle me-3">
											<span className="fw-bold text-white">WG</span>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Willie Garrison</h6>
											<p className="mb-1">
												Congratulate, James for new job.
											</p>
											<p className="small m-0 text-secondary">Today, 08:00pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2">
										<div className="icon-box md bg-warning rounded-circle me-3">
											<span className="fw-bold text-white">TJ</span>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Terry Jenkins</h6>
											<p className="mb-1">
												Lewis added new schedule release.
											</p>
											<p className="small m-0 text-secondary">Today, 09:30pm</p>
										</div>
									</div>
								</div>
								<div className="d-grid mx-3 my-1">
									<Link to="" className="btn btn-primary">View all</Link>
								</div>
							</div>
						</div>
						<div className="dropdown border-start">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-envelope-open fs-4 lh-1 text-secondary"></i>
								<span className="count-label"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-end shadow-lg">
								<h5 className="fw-semibold px-3 py-2 text-primary">Messages</h5>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<img src="assets/images/user3.png" className="img-3x me-3 rounded-5" alt="Admin Theme" />
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Angelia Payne</h6>
											<p className="mb-1">
												Membership has been ended.
											</p>
											<p className="small m-0 text-secondary">Today, 07:30pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<img src="assets/images/user1.png" className="img-3x me-3 rounded-5" alt="Admin Theme" />
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Clyde Fowler</h6>
											<p className="mb-1">
												Congratulate, James for new job.
											</p>
											<p className="small m-0 text-secondary">Today, 08:00pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2">
										<img src="assets/images/user4.png" className="img-3x me-3 rounded-5" alt="Admin Theme" />
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Sophie Michiels</h6>
											<p className="mb-1">
												Lewis added new schedule release.
											</p>
											<p className="small m-0 text-secondary">Today, 09:30pm</p>
										</div>
									</div>
								</div>
								<div className="d-grid mx-3 my-1">
									<Link to="" className="btn btn-primary">View all</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="dropdown ms-2">
						<a id="userSettings" className="dropdown-toggle d-flex py-2 align-items-center text-decoration-none" href="#!"
							role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="assets/images/user.png" className="rounded-2 img-3x" alt="Bootstrap Gallery" />
							<span className="ms-2 text-truncate d-lg-block d-none">Anne Santiago</span>
						</a>
						<div className="dropdown-menu dropdown-menu-end shadow-lg">
							<div className="header-action-links mx-3 gap-2">
								<a className="dropdown-item" href="profile.html"><i className="bi bi-person text-primary"></i>Profile</a>
								<a className="dropdown-item" href="settings.html"><i className="bi bi-gear text-danger"></i>Settings</a>
								<a className="dropdown-item" href="widgets.html"><i className="bi bi-box text-success"></i>Widgets</a>
							</div>
							<div className="mx-3 mt-2 d-grid">
								<Link onClick={handleLogout} className="btn btn-primary btn-sm">Logout</Link>
							</div>
						</div>
					</div>
				</div>
				

			</div>
        </>
    )
}



export const User_Navbar = () => {
	 const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };
    return(
        <>
        <div className="app-header d-flex align-items-center">

				
				<div className="d-flex">
					<button className="toggle-sidebar" id="toggle-sidebar">
						<i className="bi bi-list lh-1"></i>
					</button>
					<button className="pin-sidebar" id="pin-sidebar">
						<i className="bi bi-list lh-1"></i>
					</button>
				</div>
				
				<div className="app-brand py-2 ms-3">
					<Link to="/dashbaord" className="d-sm-block d-none">
						<img src="assets/images/logo.svg" className="logo" alt="Bootstrap Gallery" />
					</Link>
					<Link to="/dashbaord" className="d-sm-none d-block">
						<img src="assets/images/logo-sm.svg" className="logo" alt="Bootstrap Gallery" />
					</Link>
				</div>
				
				<div className="header-actions col">
					<div className="d-lg-flex d-none">
						
						<div className="dropdown border-start">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-bell fs-4 lh-1 text-secondary"></i>
								<span className="count-label info"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-end shadow-lg">
								<h5 className="fw-semibold px-3 py-2 text-primary">Updates</h5>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<div className="icon-box md bg-success rounded-circle me-3">
											<span className="fw-bold text-white">DS</span>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Douglass Shaw</h6>
											<p className="mb-1">
												Membership has been ended.
											</p>
											<p className="small m-0 text-secondary">Today, 07:30pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<div className="icon-box md bg-danger rounded-circle me-3">
											<span className="fw-bold text-white">WG</span>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Willie Garrison</h6>
											<p className="mb-1">
												Congratulate, James for new job.
											</p>
											<p className="small m-0 text-secondary">Today, 08:00pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2">
										<div className="icon-box md bg-warning rounded-circle me-3">
											<span className="fw-bold text-white">TJ</span>
										</div>
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Terry Jenkins</h6>
											<p className="mb-1">
												Lewis added new schedule release.
											</p>
											<p className="small m-0 text-secondary">Today, 09:30pm</p>
										</div>
									</div>
								</div>
								<div className="d-grid mx-3 my-1">
									<Link to="" className="btn btn-primary">View all</Link>
								</div>
							</div>
						</div>
						<div className="dropdown border-start">
							<a className="dropdown-toggle d-flex px-3 py-4 position-relative" href="#!" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-envelope-open fs-4 lh-1 text-secondary"></i>
								<span className="count-label"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-end shadow-lg">
								<h5 className="fw-semibold px-3 py-2 text-primary">Messages</h5>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<img src="assets/images/user3.png" className="img-3x me-3 rounded-5" alt="Admin Theme" />
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Angelia Payne</h6>
											<p className="mb-1">
												Membership has been ended.
											</p>
											<p className="small m-0 text-secondary">Today, 07:30pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2 border-bottom">
										<img src="assets/images/user1.png" className="img-3x me-3 rounded-5" alt="Admin Theme" />
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Clyde Fowler</h6>
											<p className="mb-1">
												Congratulate, James for new job.
											</p>
											<p className="small m-0 text-secondary">Today, 08:00pm</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<div className="d-flex py-2">
										<img src="assets/images/user4.png" className="img-3x me-3 rounded-5" alt="Admin Theme" />
										<div className="m-0">
											<h6 className="mb-1 fw-semibold">Sophie Michiels</h6>
											<p className="mb-1">
												Lewis added new schedule release.
											</p>
											<p className="small m-0 text-secondary">Today, 09:30pm</p>
										</div>
									</div>
								</div>
								<div className="d-grid mx-3 my-1">
									<Link to="" className="btn btn-primary">View all</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="dropdown ms-2">
						<a id="userSettings" className="dropdown-toggle d-flex py-2 align-items-center text-decoration-none" href="#!"
							role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<img src="assets/images/user.png" className="rounded-2 img-3x" alt="Bootstrap Gallery" />
							<span className="ms-2 text-truncate d-lg-block d-none">Anne Santiago</span>
						</a>
						<div className="dropdown-menu dropdown-menu-end shadow-lg">
							<div className="header-action-links mx-3 gap-2">
								<a className="dropdown-item" href="profile.html"><i className="bi bi-person text-primary"></i>Profile</a>
								<a className="dropdown-item" href="settings.html"><i className="bi bi-gear text-danger"></i>Settings</a>
								<a className="dropdown-item" href="widgets.html"><i className="bi bi-box text-success"></i>Widgets</a>
							</div>
							<div className="mx-3 mt-2 d-grid">
								<Link onClick={handleLogout} className="btn btn-primary btn-sm">Logout</Link>
							</div>
						</div>
					</div>
				</div>
				

			</div>
        </>
    )
}


export default Navbar;