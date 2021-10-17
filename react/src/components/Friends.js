import { useState, useEffect } from "react";
import { getProfile } from "../data/repository";


function Friends(props) {
    const [users, setUsersData] = useState([]);

    // Load users.
    useEffect(() => {
        async function loadUserDetails() {
            const currentDetails = await getProfile(props.user.email);
            setUsersData(currentDetails)
        }
        loadUserDetails();
    }, []);
 

    return (
        <div>
            <div className="text-center">
                <p>&nbsp;</p>
                <h1 className="home-welcome display-4">Friends</h1>
                {users.map((userDetails) =>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">{userDetails.email}</th>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            <p>&nbsp;</p>
        </div>
    );
}

// Export the Friends Function
export default Friends;