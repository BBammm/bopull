import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
		component: TabsPage,
        redirectTo: 'tabs/main'
    },
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'main',
				children: [
					{
						path: '',
						loadChildren: () => import('../main/main.module').then(m => m.MainPageModule)
					}
				]
			},
            {
				path: 'timeline',
				children: [
					{
						path: '',
						loadChildren: () => import('../timeline/timeline.module').then(m => m.TimelinePageModule)
					}
				]
			},
			{
				path: 'feed',
				children: [
					{
						path: '',
						loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule)
					}
				]
			},
            {
				path: 'mypage',
				children: [
					{
						path: '',
						loadChildren: () => import('../mypage/mypage.module').then(m => m.MypagePageModule)
					}
				]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
