import React from 'react';
import { Link } from 'react-router';
import { PlaneTakeoff, ArrowLeft, Compass } from 'lucide-react';
import { Button } from '../components/ui/button';
import { PageContainer } from '../components/layout/PageContainer';

export function NotFound() {
  return (
    <PageContainer className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md space-y-6">
        <div className="mx-auto h-20 w-20 rounded-3xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center ring-8 ring-sky-50/50 dark:ring-sky-950/30">
          <Compass className="h-10 w-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-sm font-bold text-sky-600 uppercase tracking-widest">
            Error 404 — Lost In Airspace
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Waypoint Not Found
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The flight path or airport page you are looking for has been moved, renamed, or does not exist.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Link to="/">
            <Button className="gap-2 shadow-sm">
              <ArrowLeft className="h-4 w-4" /> Return to Radar (Home)
            </Button>
          </Link>
          <Link to="/airports">
            <Button variant="outline" className="gap-2">
              <PlaneTakeoff className="h-4 w-4" /> Browse Airports
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default NotFound;
