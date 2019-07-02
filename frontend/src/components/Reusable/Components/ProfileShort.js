import * as React from 'react';
import { Avatar } from 'antd';
import { ShortProfile } from '../../Styles';

const ProfileShort = ({ user }) => (
	<ShortProfile>
		<Avatar size='large' src={`http://127.0.0.1:8080/public/${user.username}}`} />
		<a href={`/profile/${user.username}`}>{user.username}</a>
	</ShortProfile>
);

export default ProfileShort;
