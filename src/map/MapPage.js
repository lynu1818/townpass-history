import {Story} from '../battle/story.js';
// Map 頁面組件
const MapPage = () => (
	<div className="p-5">
		<h1 className="text-2xl font-bold">Map Page</h1>
		<p>This is the Map page content.</p>
		<Story id={2}/>
	</div>
);

export default MapPage;
