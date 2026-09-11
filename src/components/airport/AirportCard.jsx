import React from 'react';
import { Link } from 'react-router';
import { Plane, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';

export function AirportCard({ airport }) {
const navigate =useNavigate()
  function abc(){
navigate(`/airports/${airport.iataCode}`)
  }
  return (
    <Card className="group flex flex-col justify-between hover:border-sky-400 hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-2xl font-black text-sky-600 dark:text-sky-400 tracking-wider">
            {airport.iataCode}
          </span>
          <Badge variant="sky" className="text-[11px] font-medium capitalize">
            {airport.type ? airport.type.replace('_', ' ') : 'Airport'}
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold group-hover:text-sky-600 transition-colors line-clamp-1 pt-1">
          {airport.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-400 flex-1">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
          <span>
            {airport.city}, {airport.country} ({airport.countryCode})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Plane className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="font-mono text-xs">
            ICAO: {airport.icaoCode}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-xs">
            Elev: {airport.elevation?.toLocaleString()} ft
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        {/* <Link to={`/airports/${airport.iataCode}`} className="w-full"> */}
          <Button
            variant="outline"
            onClick ={abc}
            className="w-full justify-between group-hover:bg-sky-50 group-hover:text-sky-700 group-hover:border-sky-300 dark:group-hover:bg-sky-950/50 cursor-pointer"
          >
            <span>View Airport Details</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        {/* </Link> */}
      </CardFooter>
    </Card>
  );
}
